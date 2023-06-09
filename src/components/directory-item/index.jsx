import { BackgroundImageContainer, DirectoryBodyContainer, DirectoryItemContainer } from './styles.jsx';

const DirectoryItem = ({ category }) => {
  const { title, imageUrl } = category

  return (
    <DirectoryItemContainer>
      <BackgroundImageContainer imageUrl={imageUrl} />
      <DirectoryBodyContainer>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </DirectoryBodyContainer>
    </DirectoryItemContainer>
  )
}

export default DirectoryItem