import path from 'path';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

export default {
    mode: 'development',
    entry: './public/js/index.js', // your main JS file
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'), // output directory
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
};


