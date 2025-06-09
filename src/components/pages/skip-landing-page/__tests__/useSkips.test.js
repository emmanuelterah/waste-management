import 'whatwg-fetch';
import { renderHook, waitFor } from "@testing-library/react";
import useSkips from "../hooks/useSkips";
import { rest } from "msw";
import { setupServer } from "msw/node";

const apiUrl = "http://localhost/api/skips";

const server = setupServer(
  rest.get('*', (req, res, ctx) => {
    return res(
      ctx.json([
        { id: 1, size: 4, allowed_on_road: true, hire_period_days: 14, price_before_vat: 278 },
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("useSkips", () => {
  it("handles fetch error", async () => {
    server.use(
      rest.get('*', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    const { result } = renderHook(() => useSkips(apiUrl));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe("Network request failed");
    expect(result.current.skips).toEqual([]);
    expect(result.current.loading).toBe(false);
  });
}); 