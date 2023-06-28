import { FC } from 'react';
import { BackgroundImageContainer, DirectoryBodyContainer, DirectoryItemContainer } from './styles';
import { useNavigate } from 'react-router-dom';
import { DirectoryCategory } from '../directory';

type DirectoryItemProps = {
  category: DirectoryCategory
}

const DirectoryItem: FC<DirectoryItemProps> = ({ category }) => {
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