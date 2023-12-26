const MaterialIcon = ({
  name = "add",
  size = "1rem",
  color = "#000",
  ...props
}) => {
  const className = `material-icons ${props.className || ""}`;

  return (
    <i className={className} style={{ fontSize: size, color }} {...props}>
      {name}
    </i>
  );
};

export default MaterialIcon;
