- Crie uma classe Aluno com os atributos Nome, Idade, Nota e Status. 

- Crie uma lista com pelo menos 7 alunos. 

- Depois crie uma lista de 10 elementos que sirva de gabarito de uma prova.

const provaGabarito = ['A', 'B', 'D', 'A', 'B', 'C', 'C', 'D', 'A', 'B']

const opcoes = ['A', 'B', 'C', 'D'] 


- Percorra a lista de alunos e aleatoriamente sorteie as respostas para os alunos (simulando como se o aluno estivesse marcando a resposta da pergunta).
- A, B, C e D

- Contabilize a nota do aluno comparando a resposta que foi sorteada com o gabarito da prova. 
Cada acerto vale 1 ponto
- Atualize o status do aluno para aprovado caso o aluno tenha uma nota maior ou igual a 6 e reprovado caso a nota for menor que 6.
No final mostre os alunos aprovados, reprovados, média das notas, o melhor aluno (aluno com nota mais alta) e o pior aluno (aluno com a nota mais baixa). A saída precisa ser parecido com essa:

Dicas:
As respostas do gabarito podem ser as seguintes letras: A, B, C e D
Para sortear as respostas dos alunos pode ser utilizado o Math.random()
Os métodos filter, map e reduce são bem úteis para resolver a atividade.

