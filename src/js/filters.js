export default {
	image_path: function(comicCharacter) {
		let image = comicCharacter.thumbnail;
		return image ? `${image.path}.${image.extension}` : '' ;
	}
}