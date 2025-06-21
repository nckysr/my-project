import { useParams } from "react-router-dom"

export default function ProductOverView() {
    const param =useParams()
    const productId = param.id

    return (
    <div>
        ProductOverView {productId}
        </div>)
}   