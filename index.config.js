const options = {
	sourceDir: './src',
	buildDir: './web',
	video: {
		extension: 'mp4',
		codec: 'libx264',
		bitrate: '324k'
	},
	audio: {
		extension: 'mp3',
		codec: 'libmp3lame',
		bitrate: '96k'
	}
}

export default options
