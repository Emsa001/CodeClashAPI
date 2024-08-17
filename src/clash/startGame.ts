import { Message, TextChannel } from "discord.js";
import { Clash, StartGameProps, TempClash } from "../types/clashes";
import startRound from "./startRound";
import finishGame from "./finishGame";

const clashes: TempClash[] = [];

async function startGame({
    interaction,
    rounds,
    languages,
    modes,
    cookie,
    session,
}: StartGameProps): Promise<Clash[]> {
    try {
        const game: Clash[] = [];

        const message = await interaction.editReply(
            "Game started. Creating rounds..."
        ) as Message;
        
        const creator = interaction.member?.user;

        for (let i = 0; i < rounds; i++) {
            const round = await startRound({
                round: i + 1,
                channel: interaction.channel as TextChannel,
                creator,
                languages,
                modes,
                cookie,
                session,
            });
            if (!round) return game;
            game.push(round);
        }

        return await finishGame({ rounds, message, game });
    } catch (error) {
        await interaction.editReply(
            "An error occurred while starting the game. Please try again later."
        );
        return [];
    }
}

export default startGame;
export { clashes };
