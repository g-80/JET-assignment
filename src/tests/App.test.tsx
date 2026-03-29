import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, expect, it, afterEach } from "vitest";
import App from "../App";
import { NUM_RESULTS_DISPLAYED, POSTCODE } from "../consts";
import { makeRestaurantDto } from "./testUtils";

function mockFetch(body: unknown, ok = true, status = 200) {
  return vi.spyOn(global, "fetch").mockResolvedValue({
    ok,
    status,
    json: async () => body,
  } as Response);
}

describe("Initial render", () => {
  it("shows the hardcoded postcode", () => {
    render(<App />);
    expect(screen.getByText(new RegExp(POSTCODE))).toBeInTheDocument();
  });

  it('renders the "Display restaurants" button', () => {
    render(<App />);
    expect(
      screen.getByRole("button", { name: /Display restaurants/i }),
    ).toBeInTheDocument();
  });

  it("renders no restaurant cards on first load", () => {
    render(<App />);
    expect(screen.queryByRole("listitem")).toBeNull();
  });
});

describe("Successful fetch", () => {
  afterEach(async () => vi.restoreAllMocks());

  it("displays restaurant cards after a successful fetch", async () => {
    const dto = makeRestaurantDto();
    mockFetch({ restaurants: [dto] });

    render(<App />);
    fireEvent.click(
      screen.getByRole("button", { name: /Display restaurants/i }),
    );

    await waitFor(() => {
      expect(screen.getByText("Test Restaurant")).toBeInTheDocument();
    });
  });

  it("maps star rating correctly onto the card", async () => {
    mockFetch({ restaurants: [makeRestaurantDto()] });

    render(<App />);
    fireEvent.click(
      screen.getByRole("button", { name: /Display restaurants/i }),
    );

    await waitFor(() => expect(screen.getByText(/4\.5/)).toBeInTheDocument());
  });

  it("displays the full address on the card", async () => {
    mockFetch({ restaurants: [makeRestaurantDto()] });

    render(<App />);
    fireEvent.click(
      screen.getByRole("button", { name: /Display restaurants/i }),
    );

    await waitFor(() =>
      expect(
        screen.getByText(/1 Test Street, London, W1A 1AA/i),
      ).toBeInTheDocument(),
    );
  });

  it(`slices results to at most ${NUM_RESULTS_DISPLAYED} cards`, async () => {
    const many = Array.from({ length: NUM_RESULTS_DISPLAYED + 5 }, (_, i) =>
      makeRestaurantDto({ name: `Restaurant ${i}` }),
    );
    mockFetch({ restaurants: many });

    render(<App />);
    fireEvent.click(
      screen.getByRole("button", { name: /Display restaurants/i }),
    );

    await waitFor(() => {
      expect(screen.getAllByRole("listitem")).toHaveLength(
        NUM_RESULTS_DISPLAYED,
      );
    });
  });

  it("clears a previous error on a successful subsequent fetch", async () => {
    vi.spyOn(global, "fetch").mockRejectedValueOnce(new Error("Network down"));

    render(<App />);
    fireEvent.click(
      screen.getByRole("button", { name: /Display restaurants/i }),
    );
    await waitFor(() =>
      expect(screen.getByText(/Network down/i)).toBeInTheDocument(),
    );

    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => ({ restaurants: [makeRestaurantDto()] }),
    } as Response);

    fireEvent.click(
      screen.getByRole("button", { name: /Display restaurants/i }),
    );
    await waitFor(() => {
      expect(screen.queryByText(/Network down/i)).toBeNull();
      expect(screen.getByText("Test Restaurant")).toBeInTheDocument();
    });
  });
});

describe("Fetch calls", () => {
  afterEach(async () => vi.restoreAllMocks());

  it("fetches using the configured postcode", async () => {
    const spy = mockFetch({ restaurants: [] });

    render(<App />);
    fireEvent.click(
      screen.getByRole("button", { name: /Display restaurants/i }),
    );

    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith(expect.stringContaining(POSTCODE));
    });
  });
});

describe("Error handling", () => {
  afterEach(async () => vi.restoreAllMocks());

  it("shows an error message when the API returns a non-OK response", async () => {
    mockFetch({}, false, 500);

    render(<App />);
    fireEvent.click(
      screen.getByRole("button", { name: /Display restaurants/i }),
    );

    await waitFor(() =>
      expect(
        screen.getByText(/The API returned an error/i),
      ).toBeInTheDocument(),
    );
  });

  it("shows an error message when fetch throws a network error", async () => {
    vi.spyOn(global, "fetch").mockRejectedValue(new Error("Failed to fetch"));

    render(<App />);
    fireEvent.click(
      screen.getByRole("button", { name: /Display restaurants/i }),
    );

    await waitFor(() =>
      expect(screen.getByText(/Failed to fetch/i)).toBeInTheDocument(),
    );
  });

  it("hides the restaurant list when an error is present", async () => {
    mockFetch({}, false, 404);

    render(<App />);
    fireEvent.click(
      screen.getByRole("button", { name: /Display restaurants/i }),
    );

    await waitFor(() => {
      expect(
        screen.getByText(/The API returned an error/i),
      ).toBeInTheDocument();
      expect(screen.queryByRole("list")).toBeNull();
    });
  });
});

describe("Loading state", () => {
  afterEach(() => vi.restoreAllMocks());

  it("hides the button while loading", async () => {
    vi.spyOn(global, "fetch").mockImplementation(() => new Promise(() => {}));

    render(<App />);
    fireEvent.click(
      screen.getByRole("button", { name: /Display restaurants/i }),
    );

    await waitFor(() =>
      expect(
        screen.queryByRole("button", { name: /Display restaurants/i }),
      ).toBeNull(),
    );
  });

  it("restores the button after fetch completes", async () => {
    mockFetch({ restaurants: [] });

    render(<App />);
    fireEvent.click(
      screen.getByRole("button", { name: /Display restaurants/i }),
    );

    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: /Display restaurants/i }),
      ).toBeInTheDocument(),
    );
  });

  it("restores the button even when the fetch errors", async () => {
    vi.spyOn(global, "fetch").mockRejectedValue(new Error("oops"));

    render(<App />);
    fireEvent.click(
      screen.getByRole("button", { name: /Display restaurants/i }),
    );

    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: /Display restaurants/i }),
      ).toBeInTheDocument(),
    );
  });
});
