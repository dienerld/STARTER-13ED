select * from clientes c , endereco e , cidades c2 , estados e2 , paises p
where c.id_endereco = e.id and e.id_cidade = c2.id and c2.id_estado = e2.id and e2.id_pais = p.id;


