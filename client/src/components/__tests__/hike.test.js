import React from "react";
import { cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import { Hikes } from "../Hikes";

afterEach(() => {
  cleanup();
});

test("should match the snapshot", () => {
  const tree = renderer.create(<Hikes />).toJSON();
  expect(tree).toMatchSnapshot();
});
