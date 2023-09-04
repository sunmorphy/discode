import "../index.css";
import { BasicButton } from "../components/buttons";

const stories = {
  title: "Basic Button",
  component: BasicButton,
};

export default stories;

// eslint-disable-next-line react/react-in-jsx-scope
const TemplateStory = (args) => <BasicButton {...args} />;

const WithoutOutlineBasicButton = TemplateStory.bind({});
WithoutOutlineBasicButton.args = {
  text: "Button",
  onClick: () => {},
  isOutline: false,
};

const WithOutlineBasicButton = TemplateStory.bind({});
WithOutlineBasicButton.args = {
  text: "Button",
  onClick: () => {},
  isOutline: true,
};

export { WithoutOutlineBasicButton, WithOutlineBasicButton };
