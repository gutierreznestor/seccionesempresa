import { FieldContainer } from "./ListItem.styled";

const ListItem = ({ title, description }) => (
  <FieldContainer>
    <dt>{title}:</dt>
    <dd>{description}</dd>
  </FieldContainer>
);

export default ListItem;
