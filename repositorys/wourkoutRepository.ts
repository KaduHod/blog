const wourkouts : Array <object> = [
  {
      nome: 'Cadeira extensora',
      descricao: 'A Cadeira Extensora é um aparelho, movimento clássico da musculação, pode ser executada por alunos iniciantes e avançados e recruta isoladamente os músculos do quadríceps (parte da frente da coxa).',
      musculo:'Quadríceps'
  },
  {
      nome: 'Agachamento',
      descricao: 'O agachamento é um exercício físico de força em que o praticante abaixa os quadris a partir de uma posição em pé e depois se levanta.',
      musculo:'Quadríceps'
  },
  {
      nome: 'Afundo',
      descricao: 'Um afundo pode se referir a qualquer posição do corpo humano em que uma perna é posicionada para frente com o joelho flexionado e o pé apoiado no chão, enquanto a outra perna está posicionada para trás.',
      musculo:'Quadríceps'
  },
  {
      nome: '(subida no banco) Step up',
      descricao: 'Este é um movimento de flexão e extensão, tanto de joelho, quanto de quadril. Desta maneira, os músculos mais solicitados são o quadríceps e o glúteo máximo. Além disso, os isquiotibiais também participam do movimento, como sinergistas e estabilizadores.',
      musculo:'Posterior de coxa'
  },
  {
      nome: 'Stiff',
      descricao: 'O stiff é um exercício multiarticular (ou seja, que envolve mais de uma articulação e grupo muscular) aliado para trabalhar o core, além do posterior (parte de trás) de coxas e o bumbum.',
      musculo:'Posterior de coxa'
  },
  {
      nome: 'Mesa Flexora',
      descricao: 'A cadeira flexora ou mesa flexora é um exercício de isolamento básico que visa dois grupos musculares. O isquiotibiais (os músculos bíceps femoral, semitendíneo e semimembranoso) de forma primária e os músculos da panturrilha de forma.',
      musculo:'Posterior de coxa'
  },
  {
      nome: 'Extensão de quadril em pé',
      descricao: 'A extensão do quadril participa diretamente na sustentação de peso corporal quando se mantém em posição ereta, além de manter e controlar as ações antigravitacionais. Os músculos extensores do quadril são os isquiotibiais: Semitendinoso. Semimembranoso.',
      musculo:'Posterior de coxa'
  },
  {
      nome: 'Elevação pélvica com pernas estendidas',
      descricao: 'A elevação pélvica, ou elevação de quadril, é um movimento que aparentemente é simples, mas que envolve vários pontos de ajustes. Basicamente, o movimento articular é uma extensão de quadril. Independentemente da variação que você for fazer, este movimento precisa ser o foco.',
      musculo:'Posterior de coxa'
  },
  {
      nome: 'Panturrilha burrinho',
      descricao: 'O movimento sóleo é monoarticular, ou seja, cruza apenas uma articulação, enquanto o gastrocnêmio é biarticular, cruzando duas articulações. Por isso se deve o equipamento de panturrilha em pé e sentado, trabalhando os músculos da região de maneira mais completa.',
      musculo:'Panturrilha'
  },
  {
      nome: 'Panturrilha em pé unilateral',
      descricao: 'Em pé, eleve um de seus pés na altura do glúteo e o segure com uma de suas mãos. O pé que ficou apoiado no chão fará o movimento de subida e descida, enquanto a outra mão ficará estendida a frente para dar mais equilíbrio. Faça o mesmo com a outra perna.',
      musculo:'Panturrilha'
  },
  {
      nome: 'Supino declinado com halteres',
      descricao: 'O supino declinado com halteres é um movimento que exige mais dos músculos estabilizadores. Por ser um movimento de cadeia aberta e em uma posição onde a acção da gravidade é potencializada, temos uma maior necessidade de estabilização. Este é um movimento bastante intenso e que traz uma solicitação muscular acentuada.',
      musculo:'Peitoral'
  },
  {
      nome: 'Supino com barra',
      descricao: 'O supino reto consiste essencialmente em uma flexão de ombro horizontal seguida por uma extensão de cotovelo — movimentos potencializados pela carga na barra. Os três principais músculos recrutados são o peitoral maior, tríceps braquial e deltóide..',
      musculo:'Peitoral'
  },
  {
      nome: 'Flexão de braços',
      descricao: 'Extensões de braços no solo ou flexão (também conhecido como marinheiro ou apoio de frente) é um exercício físico realizado em posição de prancha, com os braços estendidos e as palmas das mãos afastadas a largura dos ombros e alinhadas com os mesmos.',
      musculo:'Peitoral'
  },
  {
      nome: 'Remada Curvada (pegada pronada)',
      descricao: 'Na remada curvada com pegada supinada, teremos uma maior ativação do bíceps braquial, devido a posição do antebraço, que facilita sua contração. Na pegada pronada, será possível ativar mais fortemente os músculos flexores do punho (antebraço) e reduzir levemente a atividade do bíceps braquial.',
      musculo:'Dorsal'
  },
  {
      nome: 'Barra fixa (pegada pronada)',
      descricao: 'Como fazer barra fixa pegada pronada Como fazer a barra fixa pull up       Para realizar o movimento corretamente, é importante segurar a barra com a pegada aberta pronada. Primeiramente, se pendure na barra com os braços esticados e as mãos afastadas na mesma largura dos ombros. Em seguida, flexione os joelhos e cruze os tornozelos.',
      musculo:'Dorsal'
  },
  {
      nome: 'Pulley Frente',
      descricao: 'O pulley frente é um exercício que, além de permitizr o movimento para flexões, faz com que os músculos latíssimo do dorso também atuem como estabilizadores espinhais muito poderosos para a postura durante treinos, como agachamentos e levantamentos, bem como outros movimentos atléticos.',
      musculo:'Dorsal'
  },
  {
      nome: 'Desenvolvimento no Smith',
      descricao: 'Empurre a barra para cima até que os braços fiquem estendidos em cima. Baixe a barra até que esta fiquem em frente ao pescoço e repita durante o número desejado de repetições. Comentários: Coloque a cabeça ligeiramente para trás de forma a que a barra não bata na cabeça.',
      musculo:'Deltóide'
  },
  {
      nome: 'Elevação lateral com halteres',
      descricao: 'A elevação lateral com halteres trabalham diferentes tipos de músculos simultaneamente como: deltóide anterior que é a frente dos ombros; o deltóide posterior que é a porção de trás dos ombros; o deltóide medial que é a parte de cima os ombros e o trapézio músculo infraespinhal.',
      musculo:'Deltóide'
  },
  {
      nome: 'Voador inverso (máquina)',
      descricao: 'Durante a execução do peck deck ou voador invertido ocorrerá um forte acionamento dos músculos deltoide posterior, infraespinhal, latíssimo do dorso, redondo maior, tríceps cabeça longa, romboides maior/menor e trapézio principalmente as fibras mediais.',
      musculo:'Deltóide'
  },
  {
      nome: 'Rosca concentrada',
      descricao: 'A rosca concentrada é um exercício uniarticular no qual o bíceps é o principal músculo recrutado, dessa forma uma execução correta auxilia a estimular de forma mais efetiva este grupo muscular.',
      musculo:'Bíceps'
  },
  {
      nome: 'Rosca direta no pulley',
      descricao: 'Descrição do exercício: partindo de uma posição em pé com os pés afastados na largura dos ombros e joelhos um pouco flexionados, segure a barra com os braços estendidos, pegada com afastamento igual ou um pouco maior que a distancia entre os ombros e com o dorso das mãos voltado para baixo.',
      musculo:'Bíceps'
  },
  {
      nome: 'Barra fixa (pegada supinada)',
      descricao: 'A pegada supinada é feita com a palma das mãos apontando para cima.',
      musculo:'Bíceps'
  },
  {
      nome: 'Flexão de braço fechado (Apoio mãos fechadas)',
      descricao: 'Com as mãos na mesma linha dos ombros, ombros em flexão, cotovelos estendidos e punhos em flexão, desça o movimento até uma flexão de cotovelos em 90º e retorne ao movimento inicial.',
      musculo:'Tríceps'
  },
  {
      nome: 'Tríceps coice com halteres',
      descricao: 'A perna direita fica apoiada no chão o tempo todo. Segure o halter com a mão direita e posicione o braço na linha do tronco, na verdade, lute para manter o cotovelo um pouco acima da linha do tronco durante toda a série. Comece o exercício estendendo o braço até que ele esteja bem perto de sua extensão máxima.',
      musculo:'Tríceps'
  },
  {
      nome: 'Triceps na paralela',
      descricao: 'Em suma, o exercício paralelas é essencial para quem quer ter tríceps maiores e mais fortes, e mesmo que o seu objetivo primário não seja este, tenha em mente que o tríceps compõe mais da metade do tamanho dos braços. Logo, ficar bom nas paralelas = tríceps grandes.',
      musculo:'Tríceps'
  }
]

export default  wourkouts
