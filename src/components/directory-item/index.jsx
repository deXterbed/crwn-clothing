import { BackgroundImageContainer, DirectoryBodyContainer, DirectoryItemContainer } from './styles.jsx';
import { useNavigate } from 'react-router-dom';

const DirectoryItem = ({ category }) => {
  const { title, imageUrl } = category
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/shop/${title.toLowerCase()}`)
  }

  return (
    <DirectoryItemContainer onClick={handleClick}>
      <BackgroundImageContainer imageUrl={imageUrl} />
      <DirectoryBodyContainer>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </DirectoryBodyContainer>
    </DirectoryItemContainer>
  )
}

export default DirectoryItem