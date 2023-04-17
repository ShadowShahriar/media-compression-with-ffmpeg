import options from './index.config.js'
import Ffmpeg from 'fluent-ffmpeg'
import * as ffmpegInstaller from '@ffmpeg-installer/ffmpeg'
import * as ffmpegProbe from '@ffprobe-installer/ffprobe'

const { sourceDir, buildDir } = options

function setFFMPEG() {
	Ffmpeg.setFfmpegPath(ffmpegInstaller.path)
	Ffmpeg.setFfprobePath(ffmpegProbe.path)
}
setFFMPEG()

function allGoodMsg(dir) {
	process.stdout.write(`✅ All ${dir} files are compressed.\n`)
}

function compressFile(file, dir, opts) {
	return new Promise((resolve, reject) => {
		const command = Ffmpeg(`${sourceDir}/${dir}/${file}.${opts.extension}`)
			.on('progress', info => {
				if (typeof info.percent === 'number')
					process.stdout.write(`[${file}]: ${info.percent.toFixed(2)}%\n`)
				else process.stdout.write(`[${file}]: at ${info.timemark}\n`)
			})
			.on('end', () => {
				process.stdout.write(`[${file}]: done\n\n`)
				return resolve()
			})
			.on('error', () => {
				return reject()
			})

		if (dir === 'video') command.noAudio().videoBitrate(opts.bitrate).videoCodec(opts.codec)
		else command.audioBitrate(opts.bitrate).audioCodec(opts.codec)
		command.output(`${buildDir}/${dir}/${file}.${opts.extension}`).run()
	})
}

async function compressFiles(list, dir, opts) {
	if (list.length > 0) {
		process.stdout.write(`These ${dir} files are missing:\n- ${list.join('\n- ')}\n\n`)
		for (let entry of list) await compressFile(entry, dir, opts)
	} else allGoodMsg(dir)
}

export default compressFiles
