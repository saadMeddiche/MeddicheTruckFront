export interface MenuItem {
  name: string;
  route: string;
  isVisible: () => boolean;
}

