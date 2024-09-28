interface IntersectionObserverEntry {
  isIntersecting: boolean;
}

interface IntersectionObserver {
  observe: (element: Element) => void;
  unobserve: (element: Element) => void;
  disconnect: () => void;
}
