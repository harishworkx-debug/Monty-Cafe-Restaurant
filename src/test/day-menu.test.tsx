import { QueryClient } from "@tanstack/react-query";
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DayMenuBoard } from "@/components/site/DayMenuBoard";
import {
  BARISTA_COFFEE,
  COLD_DRINKS_AND_TEA,
  DAY_DIETARY_KEY,
  DAY_FOOD_CATEGORIES,
  EXTRAS_GROUPS,
  GRAB_AND_GO_SECTIONS,
} from "@/lib/day-menu";
import { routeTree } from "@/routeTree.gen";

function renderDayMenu() {
  const rootRoute = createRootRoute();
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: DayMenuBoard,
  });
  const bookRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/book-a-table",
    component: () => <div>Book a Table</div>,
  });

  const router = createRouter({
    routeTree: rootRoute.addChildren([indexRoute, bookRoute]),
    history: createMemoryHistory({ initialEntries: ["/"] }),
  });

  return render(<RouterProvider router={router} />);
}

describe("Day menu data and interactive Grab & Go board", () => {
  it("contains all expected category counts, extras, barista coffee, drinks and Grab & Go sections", () => {
    const countsById = Object.fromEntries(
      DAY_FOOD_CATEGORIES.map((category) => [category.id, category.items.length]),
    );

    expect(countsById).toEqual({
      breakfast: 14,
      lunch: 9,
      burgers: 5,
      pasta: 5,
      salads: 3,
      kids: 10,
    });

    expect(EXTRAS_GROUPS).toHaveLength(4);
    expect(GRAB_AND_GO_SECTIONS.map((s) => s.id)).toEqual([
      "bagels",
      "toasties",
      "croissant",
      "focaccia",
      "wraps",
      "burritos",
    ]);
    expect(GRAB_AND_GO_SECTIONS.map((s) => s.items.length)).toEqual([8, 5, 5, 4, 4, 4]);
    expect(BARISTA_COFFEE.regularCoffees).toHaveLength(8);
    expect(COLD_DRINKS_AND_TEA.milkshakes.flavours).toHaveLength(7);
    expect(DAY_DIETARY_KEY).toHaveLength(6);
  });

  it("matches the /day-menu route in the application route tree", () => {
    const router = createRouter({
      routeTree,
      context: { queryClient: new QueryClient() },
      history: createMemoryHistory({ initialEntries: ["/day-menu"] }),
    });

    const matches = router.matchRoutes("/day-menu");
    expect(matches.some((m) => m.routeId === "/day-menu")).toBe(true);
  });

  it("switches Grab & Go icon drawers and filters day menu categories and dietary options", async () => {
    renderDayMenu();

    expect(await screen.findByText("Breakfast, Lunch, Grab & Go & Drinks")).toBeInTheDocument();
    expect(screen.getByText("Pig Out Platter")).toBeInTheDocument();
    expect(screen.getByText("Chicken Parma")).toBeInTheDocument();
    expect(screen.getByText("Classic Beef Burger")).toBeInTheDocument();
    expect(screen.getByText("Chicken Pesto Gnocchi")).toBeInTheDocument();
    expect(screen.getByText("Classic Greek Salad")).toBeInTheDocument();

    // Narrow to Grab & Go tab so DOM assertions remain fast and focused
    fireEvent.click(screen.getByText("Grab & Go", { selector: "button" }));
    const grabAndGoArticle = document.getElementById("day-grab-and-go");
    expect(grabAndGoArticle).not.toBeNull();
    const grabScope = within(grabAndGoArticle!);

    // Grab & Go defaults open to Bagels
    expect(grabScope.getByText("Schnitzel Bagel")).toBeInTheDocument();

    // Open Toasties / Sandwich icon card
    fireEvent.click(grabScope.getByText("Toasties / Sandwich").closest("button")!);
    const toastiesPanel = document.getElementById("grab-go-panel-toasties");
    expect(toastiesPanel).toHaveTextContent("Cheese + Tomato + Ham");
    expect(toastiesPanel).toHaveTextContent("$9.90");

    // Open Croissant icon card
    fireEvent.click(grabScope.getByText("Croissant").closest("button")!);
    const croissantPanel = document.getElementById("grab-go-panel-croissant");
    expect(croissantPanel).toHaveTextContent("Plain");
    expect(croissantPanel).toHaveTextContent("$5.00");

    // Open Focaccia icon card
    fireEvent.click(grabScope.getByText("Focaccia").closest("button")!);
    const focacciaPanel = document.getElementById("grab-go-panel-focaccia");
    expect(focacciaPanel).toHaveTextContent("Chicken & Avocado");
    expect(focacciaPanel).toHaveTextContent("Roast Veg");

    // Open Wraps icon card
    fireEvent.click(grabScope.getByText("Wraps").closest("button")!);
    const wrapsPanel = document.getElementById("grab-go-panel-wraps");
    expect(wrapsPanel).toHaveTextContent("Veggie Wrap");
    expect(wrapsPanel).toHaveTextContent("Breaky Wrap");

    // Open Burritos icon card
    fireEvent.click(grabScope.getByText("Burritos").closest("button")!);
    const burritosPanel = document.getElementById("grab-go-panel-burritos");
    expect(burritosPanel).toHaveTextContent("Classic Burrito");
    expect(burritosPanel).toHaveTextContent("Monty Special Burrito");
    expect(burritosPanel).toHaveTextContent("$18.00");
    expect(burritosPanel).toHaveTextContent(
      "Add a small coffee with any of the above burritos for $2.50.",
    );

    // Switch to Burgers tab
    fireEvent.click(screen.getByText("Burgers", { selector: "button" }));
    expect(screen.getByText("The Lot")).toBeInTheDocument();
    expect(screen.queryByText("Pig Out Platter")).not.toBeInTheDocument();

    // Filter Burgers by Vegetarian & Vegan
    fireEvent.click(screen.getByText("Vegetarian & Vegan (V / VGO)", { selector: "button" }));
    expect(screen.getByText("Veggie Burger")).toBeInTheDocument();
    expect(screen.queryByText("The Lot")).not.toBeInTheDocument();
  });
});
