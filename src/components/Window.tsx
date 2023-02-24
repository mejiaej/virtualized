interface WindowProps {
  rowHeight: number;
  children: Array<JSX.Element>;
}

const Window: React.FC<WindowProps> = ({ rowHeight, children }) => {
  return <ul>{children}</ul>;
};

export { Window };
