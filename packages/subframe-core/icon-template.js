const template = (variables, { tpl }) => {
  return tpl`
  ${variables.imports};

  import { IconWrapper } from "../../../components/icon-wrapper";
  
  ${variables.interfaces};

  const ${variables.componentName} = React.forwardRef(function ${variables.componentName}(props: React.HTMLAttributes<HTMLSpanElement>, ref: React.Ref<HTMLSpanElement>) {
    return (
      <IconWrapper ref={ref} {...props}>
        {${variables.jsx}}
      </IconWrapper>
    );
  });
    
  ${variables.exports};
  `
}

module.exports = template
