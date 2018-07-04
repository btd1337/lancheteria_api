// adaptada de https://gist.github.com/joaohcrangel/8bd48bcc40b9db63bef7201143303937.js

export const validateCPF = (cpf: string): boolean => {
	let sum: number
	let rest: number

	if (cpf === undefined || cpf.trim().length === 0 || cpf === '00000000000') {
		return false
	}
	const auxCpf = cpf
		.replace('.', '')
		.replace('.', '')
		.replace('-', '')

	sum = 0
	for (let i = 1; i <= 9; i += 1) {
		sum = sum + parseInt(auxCpf.substring(i - 1, i), 10) * (11 - i)
	}
	rest = (sum * 10) % 11

	if (rest === 10 || rest === 11) {
		rest = 0
	}
	if (rest !== parseInt(auxCpf.substring(9, 10), 10)) {
		return false
	}

	sum = 0
	for (let i = 1; i <= 10; i += 1) {
		sum = sum + parseInt(auxCpf.substring(i - 1, i), 10) * (12 - i)
	}
	rest = (sum * 10) % 11

	if (rest === 10 || rest === 11) {
		rest = 0
	}
	if (rest !== parseInt(auxCpf.substring(10, 11), 10)) {
		return false
	}
	return true
}
