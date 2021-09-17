import styled from "styled-components";

import { Link } from "react-router-dom";
import IndexContainer from "../../styles/ItemContainer.style";
import ProductImage from "../../styles/ProductImage.style";

const theme = require("../../schema.json");

const ProductDetails = styled.div`
    color: ${theme.font.description.color};
    font-size: ${theme.font.description.size};
    flex: 8;
    padding: 10px;
    border-left: ${theme.divider.splitter};
    border-right: ${theme.divider.splitter};
`;

const PriceDetails = styled.div`
    color: ${theme.font.description.color};
    font-size: ${theme.font.description.size};
    padding: 8px;
    flex: 1;
`;

const ProductCard = ({id, title, image, description, price}) => {
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
                <PriceDetails>
                    <p>${price}</p>
                </PriceDetails>
            </div>
        </IndexContainer>
    )
}

export default ProductCard;