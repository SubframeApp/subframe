const template = (variables, { tpl }) => {
  return tpl`
  ${variables.imports};

  import { forwardRef } from "../../../lib/forward-ref";
  import { IconWrapper } from "../../../components/icon-wrapper";

  ${variables.interfaces};

  const ${variables.componentName} = forwardRef(function ${variables.componentName}(props: React.HTMLAttributes<HTMLSpanElement>, ref: React.Ref<HTMLSpanElement>) {
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
