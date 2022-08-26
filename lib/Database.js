const fs = require("fs");
const path = require("path");
const { sizeFormatter } = require("human-readable");
const formatSize = sizeFormatter({
	std: "JEDEC",
	decimalPlaces: "2",
	keepTrailingZeroes: false,
	render: (literal, symbol) => `${literal} ${symbol}B`,
});
const moment = require("moment-timezone");
const getPosition = (name, _dir, option) => {
	let position = null;
	Object.keys(_dir).forEach((i) => {
		if (_dir[i][option] === name) {
			position = i;
		}
	});
	if (position !== null) {
		return position;
	}
};

class Database {
	constructor(...args) {
		this.path = "lib/database";
		this.addDatabase = function (name) {
			if (!name) return "Nombre vacío";
			if (fs.existsSync(path.join(this.path, name + ".json"))) return `El archivo '${name}' ya está disponible`;
			try {
				fs.writeFileSync(path.join(this.path, name + ".json"), "[]");
				return `Escritura exitosa del archivo "${name}"`;
			} catch (err) {
				console.error(err);
				return "Error writing file\n" + err;
			}
		};
		this.rename = function (name, setName) {
			if (!name || !setName) return setName || name + "Archivo vacío " + setName || name;
			if (!fs.existsSync(path.join(this.path, name + ".json")))
				return `'${name}' archivo no encontrado, agregue la base de datos primero`;
			if (fs.existsSync(path.join(this.path, setName + ".json"))) return `'${setName}' esta ahí`;
			try {
				fs.renameSync(path.join(this.path, name + ".json"), path.join(this.path, setName + ".json"));
				return `nombre del archivo cambió con éxito "${name}"`;
			} catch (err) {
				console.error(err);
				return "Error al renombrar archivos\n" + err;
			}
		};
		this.modified = function (name, options = "") {
			if (!name) return "nombre vacío";
			if (!options) return "opciones vacias";
			if (!fs.existsSync(path.join(this.path, name + ".json")))
				return `'${name}' archivo no encontrado, agregue la base de datos primero`;
			try {
				let data = JSON.parse(fs.readFileSync(path.join(this.path, name + ".json")));
				data.push(options);
				fs.writeFileSync(path.join(this.path, name + ".json"), JSON.stringify(data, null, 2));
				return {
					message: `éxito; agregar resultado\n"${opciones}"\nal archivo "${name}"`,
					result: JSON.parse(fs.readFileSync(path.join(this.path, name + ".json"))),
				};
			} catch (e) {
				console.error(e);
				return "Error al agregar el resultado al archivo\n" + e;
			}
		};
		this.deleteDatabase = function (name) {
			if (!name) return "empty name";
			if (!fs.existsSync(path.join(this.path, name + ".json")))
				return `'${name}' archivo no encontrado, agregue la base de datos primero`;
			try {
				fs.rmSync(path.join(this.path, name + ".json"));
				return `eliminar con éxito el archivo "${name}"`;
			} catch (err) {
				return `error al eliminar archivo\n` + err;
			}
		};
		this.cekDatabase = function (name, variable, data) {
			if (!name) return "nombre vacío";
			if (!variable) return `variable vacía, si ninguna variable se establece en "false"`;
			if (!data) return "datos vacíos";
			if (!fs.existsSync(path.join(this.path, name + ".json")))
				return `'${name}' archivo no encontrado, agregue la base de datos primero`;
			try {
				const dataFind = JSON.parse(fs.readFileSync(path.join(this.path, name + ".json")));
				return dataFind.find((da) => (variable ? da[variable] == data : da == data)) || false;
			} catch (err) {
				return "no se pudieron recuperar los datos, " + String(err);
			}
		};
		this.statDatabase = function (name) {
			if (!name) return "empty name";
			if (!fs.existsSync(name)) return `'${name}' archivo no encontrado, agregue la base de datos primero`;
			try {
				let stat = fs.statSync(name);
				return {
					filename: path.basename(name),
					path: name,
					size: formatSize(stat.size),
					createdTime: moment(stat.ctimeMs).format("DD/MM/YY HH:mm:ss"),
				};
			} catch (err) {
				console.log(err);
				return `error al cargar el estado del archivo`;
			}
		};
	}
}

module.exports = Database;
