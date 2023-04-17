import { extname } from 'path'
import { deleteSync } from 'del'
import { readdirSync, existsSync, mkdirSync } from 'fs'
import options from './index.config.js'
import compressFiles from './ffmpeg.js'

// * === fs ===
function getMissingFileList(dir) {
	let opts = options['video']
	if (dir === 'audio') opts = options['audio']
	return readdirSync(`${options.sourceDir}/${dir}`, { withFileTypes: true })
		.filter(dirent => {
			if (dirent.isFile())
				if (extname(dirent.name) === `.${opts.extension}`)
					if (!existsSync(`${options.buildDir}/${dir}/${dirent.name}`)) return true
			return false
		})
		.map(dirent => dirent.name.replace(new RegExp(`\.${opts.extension}$`), ''))
}

function createDir(dir) {
	if (!existsSync(dir)) mkdirSync(dir)
	console.log(`✅ Created folder: ${dir}`)
}

// * === del ===
function deleteExisting() {
	deleteSync([`${options.buildDir}/audio`, `${options.buildDir}/video`])
	console.log(`✅ Deleted existing folders`)
}

async function compress(type) {
	return await compressFiles(getMissingFileList(type), type, options[type])
}

// * ===
async function main() {
	// deleteExisting()
	createDir(options.buildDir)
	createDir(`${options.buildDir}/audio`)
	createDir(`${options.buildDir}/video`)
	await compress('audio')
	await compress('video')
	console.log('🎉 Great!')
}

main()
