

export function LoadLists() {

    return [
      { 
        title: 'A Contatar', 
        creatable: true,
        cards: [
          {
            id: 1,
            content: 'Diogo',
            labels: ['#7159c1'],
            user: ''
          }
        ]
      },
      { 
        title: 'Agendamento', 
        creatable: false,
        cards: [
          // {
          //   id: 6,
          //   content: 'Tiago',
          //   labels: [],
          //   user: ''
          // }
        ]
      },
      { 
        title: 'Informações coletadas', 
        creatable: false,
        cards: [
          {
            id: 7,
            content: 'Lual',
            labels: ['#7159c1'],
            user: ''
          }
        ]
      },
      { 
        title: 'Orçamento Enviado', 
        creatable: false,
        done: false,
        cards: [
          {
            id: 11,
            content: 'Guilherme',
            labels: [],
          }
        ]
      },
      { 
        title: 'Retornos', 
        creatable: false,
        done: false,
        cards: [
          {
            id: 10,
            content: 'Marcos',
            labels: [],
          }
        ]
      },
      { 
        title: 'Ag. Documento', 
        creatable: false,
        done: false,
        button: true,
        cards: [
          {
            id: 11,
            content: 'Chico',
            labels: [],
          }
        ]
      },
      { 
        title: 'Com Administrativo', 
        creatable: false,
        done: true,
        cards: [
          {
            id: 12,
            content: 'Francisco',
            labels: [],
            status: 'Aguardando Analise de Documentos',
            status_id: 0,
          }
        ]
      },
      { 
        title: 'Implantados', 
        creatable: false,
        done: true,
        cards: [
          {
            id: 13,
            content: 'Leticia',
            labels: [],
          }
        ]
      },
      { 
        title: 'Venda Declinada', 
        creatable: false,
        done: true,
        cards: [
          {
            id: 14,
            content: 'Camila',
            labels: [],
          }
        ]
      },
      { 
        title: 'Lead Declinado', 
        creatable: false,
        done: true,
        cards: [
          {
            id: 15,
            content: 'Suzana',
            labels: [],
            retorno: 1,
          }
        ]
      },
    ];
  }