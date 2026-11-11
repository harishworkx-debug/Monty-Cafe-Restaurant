import { QueryClient } from "@tanstack/react-query";
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { fireEvent, render, screen } from "@testing-library/react";
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
      "focaccias",
      "toasties",
      "burritos",
    ]);
    expect(GRAB_AND_GO_SECTIONS[0]?.items).toHaveLength(8);
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

    // Grab & Go defaults open to Bagels
    expect(screen.getByText("Schnitzel Bagel")).toBeInTheDocument();

    // Open Focaccias icon card
    fireEvent.click(screen.getByRole("button", { name: /Focaccias/i }));
    const focacciaRegion = screen.getByRole("region", {
      name: "Focaccias Grab and Go items",
    });
    expect(focacciaRegion).toHaveTextContent("BLT Focaccia");

    // Open Toasties icon card
    fireEvent.click(screen.getByRole("button", { name: /Toasties/i }));
    const toastiesRegion = screen.getByRole("region", {
      name: "Toasties Grab and Go items",
    });
    expect(toastiesRegion).toHaveTextContent("Choice of Toast");

    // Open Burritos icon card
    fireEvent.click(screen.getByRole("button", { name: /Burritos/i }));
    expect(screen.getByRole("region", { name: "Burritos Grab and Go items" })).toBeInTheDocument();

    // Switch to Burgers tab
    fireEvent.click(screen.getByRole("button", { name: "Burgers" }));
    expect(screen.getByText("The Lot")).toBeInTheDocument();
    expect(screen.queryByText("Pig Out Platter")).not.toBeInTheDocument();

    // Filter Burgers by Vegetarian & Vegan
    fireEvent.click(screen.getByRole("button", { name: "Vegetarian & Vegan (V / VGO)" }));
    expect(screen.getByText("Veggie Burger")).toBeInTheDocument();
    expect(screen.queryByText("The Lot")).not.toBeInTheDocument();
  });
});
