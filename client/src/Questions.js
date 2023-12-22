export const questions = [
    {
        section: 1,
        items: [
            {
                label:'Hi there! I\'m Avery. Welcome to Research Digest. I\'d love to learn about your interests so I can put together a personalized newsletter for you.',
                type: 'information'
            },
            {
                label: 'First Name',
                type: 'text',
                value: 'first_name'
            },
            {
                label: 'Last Name',
                type: 'text',
                value: 'last_name'
            },
            {
                label: 'Email',
                type: 'text',
                value: 'email'
            }
        ]
    },
    {
        section: 2,
        items: [
            {
                label: 'First off, what general areas of research light you up? You know, like healthcare, physics, AI - whatever gets you excited. I want to know what you\'re passionate about.',
                type: 'areas',
                value: 'areas'
            }
        ]
    },
    {
        section: 3,
        items: [
            {
                label: 'Okay, now thinking specifically about [area], what topics in that area really capture your curiosity? For example...[give examples]',
                type: 'topics',
                value: 'topics'
            }
        ]
    },
    {
        section: 4,
        items: [
                {
                        label: 'In a few sentences, tell me a bit more about why [area] fascinates you. The more details the better so I can fine tune your newsletter!',
                        type: 'why',
                        value: 'details'
                }
        ]
    },
    {
        section: 5,
        items: [
                {
                        label: 'Rate 1-5 expertise in [topic]',
                        type: 'expertise',
                        value: 'expertise'
                }
        ]
    },
    {
        section: 6,
        items: [
                {
                        label: 'And when you\'re learning about this stuff, are you looking to go super in-depth? Or do you prefer a more general overview to start with?',
                        type: 'select',
                        options: ['In-depth', 'General Overview'],
                        value: 'scope'
                }
        ]
    },
    {
        section: 7,
        items: [
                {
                        label: 'Great! We\'ll send you personalized updates about [user`s list of fields] right to your inbox. How often would you like us to send you The Research Digest?',
                        type: 'select',
                        options: ['Weekly', 'Daily'],
                        value: 'frequency'
                }
        ]
    },
    {
        section: 8,
        items: [
                {
                        label: ' Let me know if you have any other requests for the type of content you want to see. I\'m here to make this newsletter perfect for you! Anything else on your mind?',
                        value: 'other',
                        type: 'text'
                }
        ]
    },

];