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
import { IndianDinnerMenu } from "@/components/site/IndianDinnerMenu";
import {
  BREAD_OPTIONS,
  DIETARY_KEY,
  INDIAN_MENU_CATEGORIES,
  RICE_OPTIONS,
} from "@/lib/indian-menu";
import { routeTree } from "@/routeTree.gen";

function renderDinnerMenu() {
  const rootRoute = createRootRoute();
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: IndianDinnerMenu,
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

describe("Indian dinner menu data and interactive component", () => {
  it("contains all categories, item counts, rice options, breads, and dietary codes from the 9-page PDF", () => {
    const countsById = Object.fromEntries(
      INDIAN_MENU_CATEGORIES.map((category) => [category.id, category.items.length]),
    );

    expect(countsById).toEqual({
      "veg-starters": 9,
      "non-veg-starters": 5,
      "chicken-mains": 9,
      "beef-mains": 5,
      "lamb-mains": 5,
      "vegetarian-mains": 7,
      "biryani-specials": 5,
      desserts: 5,
    });

    expect(RICE_OPTIONS).toHaveLength(6);
    expect(BREAD_OPTIONS).toHaveLength(8);
    expect(DIETARY_KEY).toHaveLength(7);
  });

  it("matches the /indian-dinner route in the application route tree", () => {
    const router = createRouter({
      routeTree,
      context: { queryClient: new QueryClient() },
      history: createMemoryHistory({ initialEntries: ["/indian-dinner"] }),
    });

    const matches = router.matchRoutes("/indian-dinner");
    expect(matches.some((m) => m.routeId === "/indian-dinner")).toBe(true);
  });

  it("renders dishes, filters by category tab, and filters dietary options cleanly", async () => {
    renderDinnerMenu();

    expect(await screen.findByText("Authentic Indian Dinner Menu")).toBeInTheDocument();
    expect(screen.getByText("Butter Chicken")).toBeInTheDocument();
    expect(screen.getByText("Lamb Biryani")).toBeInTheDocument();
    expect(screen.getByText("Gulab Jamun")).toBeInTheDocument();
    expect(screen.getByText("Nutella Naan")).toBeInTheDocument();

    // Category tab filter
    fireEvent.click(screen.getByRole("button", { name: "Non-Veg Starters" }));
    expect(screen.getByText("Lamb Chops")).toBeInTheDocument();
    expect(screen.queryByText("Butter Chicken")).not.toBeInTheDocument();

    // Switch back to All Menu and filter Vegetarian & Vegan
    fireEvent.click(screen.getByRole("button", { name: "All Menu" }));
    fireEvent.click(screen.getByRole("button", { name: "Vegetarian & Vegan" }));

    expect(screen.getByText("Samosas")).toBeInTheDocument();
    expect(screen.getByText("Shahi Paneer")).toBeInTheDocument();
    expect(screen.getByText("Plain Rice")).toBeInTheDocument();
    expect(screen.getByText("Garlic Naan")).toBeInTheDocument();
    expect(screen.queryByText("Chicken Naan")).not.toBeInTheDocument();
    expect(screen.queryByText("Chicken & Cheese Naan")).not.toBeInTheDocument();
    expect(screen.queryByText("Butter Chicken")).not.toBeInTheDocument();

    // Dietary filter Gluten-Free
    fireEvent.click(screen.getByRole("button", { name: "Gluten-Free (GF)" }));
    expect(screen.getByText("Onion Bhaji")).toBeInTheDocument();
    expect(screen.getByText("Plain Rice")).toBeInTheDocument();
    expect(screen.queryByText("Roti")).not.toBeInTheDocument();
  });
});
