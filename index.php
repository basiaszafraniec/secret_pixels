<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Courier New', Courier, monospace;
            border: none;
            outline: none;
        }

        body {
            background-color: #000;
            color: #eee;
        }

        canvas {
            background-color: #000;
            display: none;
            position: absolute;
        }

        #container {
            background-color: #000;
            padding: 30px;
            height: 100px;
            width: 350px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        #container p {
            font-size: 30px;
            padding: 0.5rem;
            font-weight: bold;
            letter-spacing: 0.1rem;
            text-align: center;
            overflow: hidden;
            z-index: 10;
            background-color: #000;
        }

        #container p span.typed-text {
            font-weight: normal;
            color: #fff;
        }

        #container p span.cursor {
            display: inline-block;
            background-color: #ccc;
            margin-left: 0.1rem;
            width: 2px;
            animation: blink 1s infinite;
        }

        #container p span.cursor.typing {
            animation: blink;
        }

        @keyframes blink {
            0% {
                background-color: #ccc;
            }

            49% {
                background-color: #ccc;
            }

            50% {
                background-color: transparent;
            }

            99% {
                background-color: transparent;
            }

            100% {
                background-color: #ccc;
            }
        }

        #input1 {
            width: 300px;
            height: 100px;
            position: absolute;
            background-color: #000;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 30px;
            text-align: center;
            color: #fff;
        }

        #input1:hover {
            cursor: default;
        }

        #input1:focus {
            outline: none;
        }
    </style>
</head>

<body>
    <canvas id="canvas"></canvas>

    <div id="container">
        <p id="text"><span class="typed-text"></span><span class="cursor">&nbsp;</span></p>
        <input type="text" id="input1" maxlength="6">
    </div>
    
    <script src="script.js"></script>
</body>

</html>