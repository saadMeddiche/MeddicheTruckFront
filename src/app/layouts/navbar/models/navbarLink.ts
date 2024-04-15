/*
* This interface represent the links in the navbar.
* name: the name of the link
* function: the function that will be executed when the link is clicked
* isVisible: a function that returns a boolean to determine if the link should be visible or not
* */

export interface NavbarLink {
  name: string;
  function: () => void;
  isVisible: () => boolean;
}

