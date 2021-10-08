import { FieldContainer } from "./ListItem.styled";

/**
 * 
 * @param {string} title
 * @param {string} description
 */
const ListItem = ({ title, description }) => (
  <FieldContainer>
    <dt>{title}:</dt>
    <dd>{description}</dd>
  </FieldContainer>
);

export default ListItem;
