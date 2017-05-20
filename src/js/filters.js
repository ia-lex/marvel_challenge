export default {
	image_path: function(image) {
		return image ? `${image.path}.${image.extension}` : '' ;
	}
}