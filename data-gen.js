window.generateCpf = function generateCpf() {
    let cpf = [];
    
    // Gera os 9 primeiros dígitos do CPF
    for (let i = 0; i < 9; i++) {
        cpf.push(Math.floor(Math.random() * 10));
    }

    // Gera os 2 últimos dígitos verificadores
    for (let _ = 0; _ < 2; _++) {
        let val = cpf.reduce((acc, v, i) => acc + (cpf.length + 1 - i) * v, 0) % 11;
        cpf.push(val > 1 ? 11 - val : 0);
    }

    // Formata o CPF como uma string
    return `${cpf[0]}${cpf[1]}${cpf[2]}.${cpf[3]}${cpf[4]}${cpf[5]}.${cpf[6]}${cpf[7]}${cpf[8]}-${cpf[9]}${cpf[10]}`;
}

window.generatePhoneNumber = function generatePhoneNumber() {
    let digits = ['9'];
    
    // Gera os 8 números restantes do telefone
    for (let i = 0; i < 8; i++) {
        digits.push(Math.floor(Math.random() * 10).toString());
    }

    // Forma o telefone com o código DDD e os números gerados
    let phoneNumber = digits.join('');
    return `${Math.floor(Math.random() * 90) + 10}${phoneNumber}`;
}

window.generateEmail = function generateEmail() {
    const validchars = 'abcdefghijklmnopqrstuvwxyz1234567890';
    const loginlen = Math.floor(Math.random() * 12) + 4;  // Tamanho do login entre 4 e 15 caracteres
    let login = '';

    // Gera o login aleatório
    for (let i = 0; i < loginlen; i++) {
        login += validchars.charAt(Math.floor(Math.random() * validchars.length));
    }

    // Escolhe o servidor e o TLD aleatoriamente
    const servers = ['@gmail', '@yahoo', '@hotmail'];
    const tlds = ['.com', '.net'];

    // Retorna o email gerado
    return login + servers[Math.floor(Math.random() * servers.length)] + tlds[Math.floor(Math.random() * tlds.length)];
}

function format(cnpj) {
	return (
		cnpj
			.toString()
			// Remove non digit characters
			.replace(/[^\d]/g, '')
			// Apply formatting
			.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')
	)
}

window.generateCnpj = function generateCnpj() {
	let cnpj = ''
	let i = 12

	while (i--) {
		cnpj += Math.floor(Math.random() * 9)
	}

	cnpj += digit(cnpj)
	cnpj += digit(cnpj)

	return format(cnpj)
}

function digit(numbers) {
	let index = 2

	const sum = [...numbers].reverse().reduce((buffer, number) => {
		buffer += Number(number) * index
		index = index === 9 ? 2 : index + 1
		return buffer
	}, 0)

	const mod = sum % 11

	return mod < 2 ? 0 : 11 - mod
}
