
/*ADICIONAR EXTENSÃO QUE GERA UUID'S*/
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
select * from pg_available_extensions;

/* CONFIGURAÇÃO DE TIMEZONE BR */
select * from pg_timezone_names;
alter database growdevlojavirtual set TIMEZONE to 'America/Sao_Paulo';
SHOW TIMEZONE;
select current_timestamp;


CREATE TABLE paises (
  id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  nome varchar(60) NOT NULL,
  sigla varchar(2) NOT NULL
);


CREATE TABLE estados (
	id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
	nome varchar(60) NOT NULL,
	sigla_uf varchar(2) NOT null,
	id_pais uuid DEFAULT null,
	FOREIGN KEY (id_pais) REFERENCES paises (id)
);


CREATE TABLE cidades (
    id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    nome varchar(120),
    id_estado uuid not NULL,
 	FOREIGN KEY (id_estado) REFERENCES estados (id)
);


create table endereco (
	id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    logradouro varchar(120) not NULL,
    numero varchar(20) not NULL,
    cep varchar(20) not NULL,
    complemento varchar(100) default NULL,
    bairro varchar(100) not NULL,
    id_cidade uuid not NULL,
 	FOREIGN KEY (id_cidade) REFERENCES cidades (id)
);


create table clientes (
	id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    nome varchar(120) not NULL,
    cpf varchar(20) not NULL,
    id_endereco uuid default null,
 	FOREIGN KEY (id_endereco) REFERENCES endereco (id)
);

/* INSERT PAISES */
INSERT INTO public.paises
(id, nome, sigla)
VALUES('43ea1c94-2b79-4ea9-81c6-b0a5a7b4d5df'::uuid, 'Brasil', 'BR');
INSERT INTO public.paises
(id, nome, sigla)
VALUES('8b48212f-ad1a-4b34-bf37-1096842f7182'::uuid, 'Austrália', 'AU');
INSERT INTO public.paises
(id, nome, sigla)
VALUES('c556720a-ab36-45c9-bcc5-549f4c03535c'::uuid, 'China', 'CN');
INSERT INTO public.paises
(id, nome, sigla)
VALUES('1018f69a-dba6-4cee-a7db-b55dbb990817'::uuid, 'Portugal', 'PT');
INSERT INTO public.paises
(id, nome, sigla)
VALUES('93eb3c8a-b533-470d-8e6d-f78b78f6bd6b'::uuid, 'Estados Unidos', 'US');


/* insert estados */
INSERT INTO public.estados
(id, nome, sigla_uf, id_pais)
VALUES('53082df3-3adf-4660-8235-806717357e36'::uuid, 'Acre', 'AC', '43ea1c94-2b79-4ea9-81c6-b0a5a7b4d5df'::uuid);
INSERT INTO public.estados
(id, nome, sigla_uf, id_pais)
VALUES('5e36f752-229c-4c32-a1eb-0a710593aec1'::uuid, 'Alagoas', 'AL', '43ea1c94-2b79-4ea9-81c6-b0a5a7b4d5df'::uuid);
INSERT INTO public.estados
(id, nome, sigla_uf, id_pais)
VALUES('406f1924-0269-4a4d-b3a2-ee85b9a66823'::uuid, 'Amazonas', 'AM', '43ea1c94-2b79-4ea9-81c6-b0a5a7b4d5df'::uuid);
INSERT INTO public.estados
(id, nome, sigla_uf, id_pais)
VALUES('87231695-7390-4d91-ad32-bf534152fc69'::uuid, 'Amapá', 'AP', '43ea1c94-2b79-4ea9-81c6-b0a5a7b4d5df'::uuid);
INSERT INTO public.estados
(id, nome, sigla_uf, id_pais)
VALUES('2fc383de-7c31-4447-96a8-d6e128408d5a'::uuid, 'Bahia', 'BA', '43ea1c94-2b79-4ea9-81c6-b0a5a7b4d5df'::uuid);
INSERT INTO public.estados
(id, nome, sigla_uf, id_pais)
VALUES('0fce19fd-e189-452c-a6cb-874c0ac01dcf'::uuid, 'Ceará', 'CE', '43ea1c94-2b79-4ea9-81c6-b0a5a7b4d5df'::uuid);
INSERT INTO public.estados
(id, nome, sigla_uf, id_pais)
VALUES('776f8484-95ed-4e78-9039-efa250c35c97'::uuid, 'Distrito Federal', 'DF', '43ea1c94-2b79-4ea9-81c6-b0a5a7b4d5df'::uuid);
INSERT INTO public.estados
(id, nome, sigla_uf, id_pais)
VALUES('46fd81f5-780e-4e7c-a677-c23e5e9a6a29'::uuid, 'Espírito Santo', 'ES', '43ea1c94-2b79-4ea9-81c6-b0a5a7b4d5df'::uuid);
INSERT INTO public.estados
(id, nome, sigla_uf, id_pais)
VALUES('1a27e873-a9fe-42e7-b524-2c1d2b718776'::uuid, 'Goiás', 'GO', '43ea1c94-2b79-4ea9-81c6-b0a5a7b4d5df'::uuid);
INSERT INTO public.estados
(id, nome, sigla_uf, id_pais)
VALUES('0869da8f-e9c4-4fa0-9f95-2c00476a55f9'::uuid, 'Maranhão', 'MA', '43ea1c94-2b79-4ea9-81c6-b0a5a7b4d5df'::uuid);
INSERT INTO public.estados
(id, nome, sigla_uf, id_pais)
VALUES('b054bebb-9039-499b-a2a1-ca79f7ff004b'::uuid, 'Minas Gerais', 'MG', '43ea1c94-2b79-4ea9-81c6-b0a5a7b4d5df'::uuid);
INSERT INTO public.estados
(id, nome, sigla_uf, id_pais)
VALUES('dcf5404a-d7f3-4ce1-af85-5fccf56b23bf'::uuid, 'Mato Grosso do Sul', 'MS', '43ea1c94-2b79-4ea9-81c6-b0a5a7b4d5df'::uuid);
INSERT INTO public.estados
(id, nome, sigla_uf, id_pais)
VALUES('94fc433e-f6d8-4576-9908-378a04a96782'::uuid, 'Mato Grosso', 'MT', '43ea1c94-2b79-4ea9-81c6-b0a5a7b4d5df'::uuid);
INSERT INTO public.estados
(id, nome, sigla_uf, id_pais)
VALUES('9bc21e4f-7ef4-4751-b03d-2417f78119cd'::uuid, 'Pará', 'PA', '43ea1c94-2b79-4ea9-81c6-b0a5a7b4d5df'::uuid);
INSERT INTO public.estados
(id, nome, sigla_uf, id_pais)
VALUES('0db8873a-32cf-4017-a030-15bddcab2492'::uuid, 'Paraíba', 'PB', '43ea1c94-2b79-4ea9-81c6-b0a5a7b4d5df'::uuid);
INSERT INTO public.estados
(id, nome, sigla_uf, id_pais)
VALUES('383bc4c0-0511-4fde-85bb-2f23dee3b952'::uuid, 'Pernambuco', 'PE', '43ea1c94-2b79-4ea9-81c6-b0a5a7b4d5df'::uuid);
INSERT INTO public.estados
(id, nome, sigla_uf, id_pais)
VALUES('cd5bb206-ec90-4c75-9162-8b22bb9446b3'::uuid, 'Piauí', 'PI', '43ea1c94-2b79-4ea9-81c6-b0a5a7b4d5df'::uuid);
INSERT INTO public.estados
(id, nome, sigla_uf, id_pais)
VALUES('3e2b5c50-97fd-4552-9b92-c2fc34c1eda2'::uuid, 'Paraná', 'PR', '43ea1c94-2b79-4ea9-81c6-b0a5a7b4d5df'::uuid);
INSERT INTO public.estados
(id, nome, sigla_uf, id_pais)
VALUES('c63bbb4b-bb71-464c-b102-97ad4b7f1b0e'::uuid, 'Rio de Janeiro', 'RJ', '43ea1c94-2b79-4ea9-81c6-b0a5a7b4d5df'::uuid);
INSERT INTO public.estados
(id, nome, sigla_uf, id_pais)
VALUES('3f3fc8b2-c3bd-40cf-9758-749ebb420d95'::uuid, 'Rio Grande do Norte', 'RN', '43ea1c94-2b79-4ea9-81c6-b0a5a7b4d5df'::uuid);
INSERT INTO public.estados
(id, nome, sigla_uf, id_pais)
VALUES('cfbd2cc4-406b-4361-90b5-ca8e9e8cb977'::uuid, 'Rondônia', 'RO', '43ea1c94-2b79-4ea9-81c6-b0a5a7b4d5df'::uuid);
INSERT INTO public.estados
(id, nome, sigla_uf, id_pais)
VALUES('eef971d8-da45-496d-a5df-b2204ca1d3c6'::uuid, 'Roraima', 'RR', '43ea1c94-2b79-4ea9-81c6-b0a5a7b4d5df'::uuid);
INSERT INTO public.estados
(id, nome, sigla_uf, id_pais)
VALUES('03af1baa-52ef-4c41-9a61-5c222118613c'::uuid, 'Rio Grande do Sul', 'RS', '43ea1c94-2b79-4ea9-81c6-b0a5a7b4d5df'::uuid);
INSERT INTO public.estados
(id, nome, sigla_uf, id_pais)
VALUES('f3da1635-7982-4efc-99c1-db032d421c97'::uuid, 'Santa Catarina', 'SC', '43ea1c94-2b79-4ea9-81c6-b0a5a7b4d5df'::uuid);
INSERT INTO public.estados
(id, nome, sigla_uf, id_pais)
VALUES('3b5e860e-2043-450e-9c87-61b431feabec'::uuid, 'Sergipe', 'SE', '43ea1c94-2b79-4ea9-81c6-b0a5a7b4d5df'::uuid);
INSERT INTO public.estados
(id, nome, sigla_uf, id_pais)
VALUES('863a7faf-7268-4912-8a45-45ba839da4e8'::uuid, 'São Paulo', 'SP', '43ea1c94-2b79-4ea9-81c6-b0a5a7b4d5df'::uuid);
INSERT INTO public.estados
(id, nome, sigla_uf, id_pais)
VALUES('cf11531e-cc66-4b52-97e2-fc9ec8bb474e'::uuid, 'Tocantins', 'TO', '43ea1c94-2b79-4ea9-81c6-b0a5a7b4d5df'::uuid);
INSERT INTO public.estados
(id, nome, sigla_uf, id_pais)
VALUES('7a4d504b-6b85-4841-82b4-87b522e50090'::uuid, 'Exterior', 'EX', NULL);



/* INSERT CIDADES */
INSERT INTO public.cidades
(id, nome, id_estado)
VALUES('a9001adc-834f-4853-8917-a8d7cefee4fc'::uuid, 'Aceguá', '03af1baa-52ef-4c41-9a61-5c222118613c'::uuid);
INSERT INTO public.cidades
(id, nome, id_estado)
VALUES('f6ae8321-10f3-451b-b336-c1ba52c13645'::uuid, 'Água Santa', '03af1baa-52ef-4c41-9a61-5c222118613c'::uuid);
INSERT INTO public.cidades
(id, nome, id_estado)
VALUES('64db972b-1f59-4ef5-be6a-38f347029cde'::uuid, 'Agudo', '03af1baa-52ef-4c41-9a61-5c222118613c'::uuid);
INSERT INTO public.cidades
(id, nome, id_estado)
VALUES('e82ceda1-a1f7-42c9-b666-a94578008ee0'::uuid, 'Ajuricaba', '03af1baa-52ef-4c41-9a61-5c222118613c'::uuid);
INSERT INTO public.cidades
(id, nome, id_estado)
VALUES('328addc2-a628-4765-b54c-ab78ef30e72e'::uuid, 'Alecrim', '03af1baa-52ef-4c41-9a61-5c222118613c'::uuid);
INSERT INTO public.cidades
(id, nome, id_estado)
VALUES('a0f8a4d7-bedb-4d87-b638-3f08f787210b'::uuid, 'Alegrete', '03af1baa-52ef-4c41-9a61-5c222118613c'::uuid);
INSERT INTO public.cidades
(id, nome, id_estado)
VALUES('6f8dfacc-154e-4eb4-9534-f8f03191b87d'::uuid, 'Alegria', '03af1baa-52ef-4c41-9a61-5c222118613c'::uuid);
INSERT INTO public.cidades
(id, nome, id_estado)
VALUES('d4eb215c-0ec8-442c-b83a-ea783e179cfd'::uuid, 'Almirante Tamandaré do Sul', '03af1baa-52ef-4c41-9a61-5c222118613c'::uuid);
INSERT INTO public.cidades
(id, nome, id_estado)
VALUES('1cd82266-66fc-4001-84b5-a378e9fbcc8b'::uuid, 'Alpestre', '03af1baa-52ef-4c41-9a61-5c222118613c'::uuid);
INSERT INTO public.cidades
(id, nome, id_estado)
VALUES('60bfac34-19ab-4967-9713-1224e736000e'::uuid, 'Alto Alegre', '03af1baa-52ef-4c41-9a61-5c222118613c'::uuid);
INSERT INTO public.cidades
(id, nome, id_estado)
VALUES('208d157e-97c3-471c-a9f4-dd493dc0fc37'::uuid, 'Alto Feliz', '03af1baa-52ef-4c41-9a61-5c222118613c'::uuid);
INSERT INTO public.cidades
(id, nome, id_estado)
VALUES('0a569cf3-7c0a-4863-9d94-cdc5f686f66d'::uuid, 'Alvorada', '03af1baa-52ef-4c41-9a61-5c222118613c'::uuid);
INSERT INTO public.cidades
(id, nome, id_estado)
VALUES('d72fbbf1-91ef-42c6-9f8e-e682eb8b6e56'::uuid, 'Amaral Ferrador', '03af1baa-52ef-4c41-9a61-5c222118613c'::uuid);


/* INSERT ENDERECO */
INSERT INTO public.endereco
(id, logradouro, numero, cep, complemento, bairro, id_cidade)
VALUES('d7d6f0e2-d84d-461b-a93d-c4ef80553752'::uuid, 'Rua 1', '01', '99999-999', NULL, 'Bairro 1', '208d157e-97c3-471c-a9f4-dd493dc0fc37'::uuid);
INSERT INTO public.endereco
(id, logradouro, numero, cep, complemento, bairro, id_cidade)
VALUES('db1e0f79-9d56-40fd-9c4c-b6e97b241a6d'::uuid, 'Rua 2', '02', '99999-998', NULL, 'Bairro 2', 'a0f8a4d7-bedb-4d87-b638-3f08f787210b'::uuid);
INSERT INTO public.endereco
(id, logradouro, numero, cep, complemento, bairro, id_cidade)
VALUES('9ef8f825-0a0f-4a66-b671-506de726f70c'::uuid, 'Rua 3', '03', '99999-997', NULL, 'Bairro 3', '6f8dfacc-154e-4eb4-9534-f8f03191b87d'::uuid);
INSERT INTO public.endereco
(id, logradouro, numero, cep, complemento, bairro, id_cidade)
VALUES('7e3a5774-f621-4534-adef-001ee93196f7'::uuid, 'Rua 4', '04', '99999-996', NULL, 'Bairro 4', '0a569cf3-7c0a-4863-9d94-cdc5f686f66d'::uuid);
INSERT INTO public.endereco
(id, logradouro, numero, cep, complemento, bairro, id_cidade)
VALUES('8db460b4-5a4e-4514-b856-b96f824d8657'::uuid, 'Rua 5', '05', '99999-995', NULL, 'Bairro 5', 'e82ceda1-a1f7-42c9-b666-a94578008ee0'::uuid);
INSERT INTO public.endereco
(id, logradouro, numero, cep, complemento, bairro, id_cidade)
VALUES('cbb1b426-07b2-4b24-9639-96aec21e59be'::uuid, 'Rua 6', '06', '99999-994', NULL, 'Bairro 6', 'f6ae8321-10f3-451b-b336-c1ba52c13645'::uuid);
INSERT INTO public.endereco
(id, logradouro, numero, cep, complemento, bairro, id_cidade)
VALUES('1c1e6987-22e9-4e90-a49d-507c4245c6f9'::uuid, 'Rua 7', '07', '99999-993', NULL, 'Bairro 7', '0a569cf3-7c0a-4863-9d94-cdc5f686f66d'::uuid);


/* INSERT CLIENTES */
INSERT INTO public.clientes
(id, nome, cpf, id_endereco)
VALUES('b6aabed3-ea63-40b6-bce2-d849e79809ed'::uuid, 'João da Silva', '00011122233', 'db1e0f79-9d56-40fd-9c4c-b6e97b241a6d'::uuid);
INSERT INTO public.clientes
(id, nome, cpf, id_endereco)
VALUES('b84e1f60-b39c-49a9-8d06-ab3258e81cdf'::uuid, 'Maria da Silva', '11122233344', '7e3a5774-f621-4534-adef-001ee93196f7'::uuid);
INSERT INTO public.clientes
(id, nome, cpf, id_endereco)
VALUES('109d8975-87af-44c3-bae8-6992eb92f77f'::uuid, 'Pedro da Silva', '22233344455', 'cbb1b426-07b2-4b24-9639-96aec21e59be'::uuid);
INSERT INTO public.clientes
(id, nome, cpf, id_endereco)
VALUES('fafa7ee7-3259-4f13-bdcc-243786f9effe'::uuid, 'Joana da Silva', '33344455566', '1c1e6987-22e9-4e90-a49d-507c4245c6f9'::uuid);
INSERT INTO public.clientes
(id, nome, cpf, id_endereco)
VALUES('c621a879-719b-4b10-a2e1-f81d84cd3317'::uuid, 'Joaquim da Silva', '44455566677', NULL);
INSERT INTO public.clientes
(id, nome, cpf, id_endereco)
VALUES('1666442d-5dfb-4a34-ac9d-4660a35afc81'::uuid, 'Martim da Silva', '55566677788', NULL);










