const {PrimaryGeneratedColumn, JoinColumn} = require("typeorm");
module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "xo",
    "overrides": [
        {
            "extends": [
                "xo-typescript"
            ],
            "files": [
                "*.ts",
                "*.tsx"
            ],
            "rules": {
                '@typescript-eslint/ban-types': 'off',
                '@typescript-eslint/indent': ['error', 4],
                "new-cap": [
                    "error",
                    {
                        "capIsNewExceptions": [
                            "Entity",
                            "PrimaryGeneratedColumn",
                            "Column",
                            "ManyToOne",
                            "JoinColumn",
                            "OneToOne",
                            "OneToMany",
                            "Unique"
                        ]
                    }
                ]
            },
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
    }
}
