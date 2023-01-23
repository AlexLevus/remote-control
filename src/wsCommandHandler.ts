import Jimp from 'jimp';
import WebSocket from 'ws';
import { Button, down, left, mouse, Point, Region, right, screen, straightTo, up } from '@nut-tree/nut-js';

import COMMANDS from './commands';
import { calculateCirclePoints } from './utils';

const handleWSCommand = async (data: WebSocket.RawData) => {
    const [command, ...args] = data.toString().split(' ');
    const firstArg = Number(args[0]);
    const secondArg = Number(args[1]);

    switch (command) {
        case COMMANDS.MOUSE_UP: {
            await mouse.move(up(firstArg));
            break;
        }
        case COMMANDS.MOUSE_DOWN: {
            await mouse.move(down(firstArg));
            break;
        }
        case COMMANDS.MOUSE_LEFT: {
            await mouse.move(left(firstArg));
            break;
        }
        case COMMANDS.MOUSE_RIGHT: {
            await mouse.move(right(firstArg));
            break;
        }
        case COMMANDS.GET_MOUSE_POSITION: {
            const { x, y } = await mouse.getPosition();
            return `mouse_position ${x},${y}`;
        }
        case COMMANDS.DRAW_CIRCLE: {
            const radius = firstArg;
            const initialPoint = await mouse.getPosition();
            const centerPoint = new Point(initialPoint.x - radius, initialPoint.y);
            const circlePoints = calculateCirclePoints(centerPoint, radius, 100);

            await mouse.pressButton(Button.LEFT);
            for (const point of circlePoints) {
                await mouse.move(straightTo(point));
            }
            await mouse.releaseButton(Button.LEFT);
            break;
        }
        case COMMANDS.DRAW_SQUARE: {
            await mouse.pressButton(Button.LEFT);
            await mouse.move(right(firstArg));
            await mouse.move(down(firstArg));
            await mouse.move(left(firstArg));
            await mouse.move(up(firstArg));
            await mouse.releaseButton(Button.LEFT);
            break;
        }
        case COMMANDS.DRAW_RECTANGLE: {
            await mouse.pressButton(Button.LEFT);
            await mouse.move(right(firstArg));
            await mouse.move(down(secondArg));
            await mouse.move(left(firstArg));
            await mouse.move(up(secondArg));
            await mouse.releaseButton(Button.LEFT);
            break;
        }
        case COMMANDS.PRINT_SCREEN: {
            const { x, y } = await mouse.getPosition();
            const screenRegion = new Region(x - 100, y - 100, 200, 200);
            const grabbedRegion = await screen.grabRegion(screenRegion);
            const jimp = new Jimp(await grabbedRegion.toRGB());
            const pngBuffer = await jimp.getBufferAsync(Jimp.MIME_PNG);

            return `prnt_scrn ${pngBuffer.toString('base64')}`;
        }
        default: {
            console.log('Unknown command');
        }
    }
};

export default handleWSCommand;
