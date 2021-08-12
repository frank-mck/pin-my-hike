import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import { Hikes } from "../Hikes";

afterEach(() => {
  cleanup();
});

test("should render the component", () => {
  render(<Hikes />);
  const hikeElement = screen.getByTestId("hike");

  expect(hikeElement).toBeInTheDocument();
  expect(hikeElement).toHaveTextContent("Hello from server!");
});

test("should match the snapshot", () => {
  const tree = renderer.create(<Hikes />).toJSON();
  expect(tree).toMatchSnapshot();
});
