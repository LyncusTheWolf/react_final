import styled from "styled-components";

import { Link } from "react-router-dom";
import IndexContainer from "../../styles/ItemContainer.style";
import ProductImage from "../../styles/ProductImage.style";

const theme = require("../../schema.json");

const ProductDetails = styled.div`
    color: #777;
    flex: 1;
    padding: 10px;
    border-left: ${theme.divider.splitter};
`;

const ProductCard = ({id, title, image, description}) => {
    return(
        <IndexContainer>
            <div className="flex flex-1">
                <div>
                    <ProductImage src={image} alt={`Product Image of ${title}`}/>
                </div>
                <ProductDetails>
                    <Link to={`/products/${id}`}>{title}</Link>
                    <p>{description}</p>
                </ProductDetails>
            </div>
        </IndexContainer>
    )
}

export default ProductCard;