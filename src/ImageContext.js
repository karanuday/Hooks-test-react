import React from 'react';

const ImageContext = React.createContext();

class StateProvider extends React.Component {
  constructor(props) {
    super(props);

    this.stateFunctions = {
      selectImage: this.selectImage.bind(this),
      fetchAssetPath: this.fetchAssetPath.bind(this),
    };

    this.state = {
      images: [
        {
          "id": 1,
          "title": "Example 1",
          "src": "assets/images/1.jpg"
        },
        {
          "id": 2,
          "title": "Example 2",
          "src": "assets/images/2.jpg"
        },
        {
          "id": 3,
          "title": "Example 3",
          "src": "assets/images/3.jpg"
        },
        {
          "id": 4,
          "title": "Example 4",
          "src": "assets/images/4.jpg"
        },
        {
          "id": 5,
          "title": "Example 5",
          "src": "assets/images/5.jpg"
        },
        {
          "id": 6,
          "title": "Example 6",
          "src": "assets/images/6.jpg"
        }
      ],
      selectedId: 1,
    };
  }

  selectImage(id) {
    this.setState({ selectedId: id });
  }

  fetchAssetPath(id) {
    return (this.state.images.find(img => img.id === parseInt(id)) || {}).src;
  }

  render() {
    const { children } = this.props;
    // this.getImageData();
    // const { registerUser, updateUserDetail, changePage } = this;
    return (
      <ImageContext.Provider
        value={{
          ...this.state,
          ...this.stateFunctions,
        }}>
        {children}
      </ImageContext.Provider>
    );
  }
}

export default ImageContext;

export { StateProvider };