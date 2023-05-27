const {PrimaryGeneratedColumn} = require("typeorm");
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
                '@typescript-eslint/indent': ['error', 4],
                "new-cap": [
                    "error",
                    {
                        "capIsNewExceptions": [
                            "Entity",
                            "PrimaryGeneratedColumn",
                            "Column",

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
