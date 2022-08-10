import React, { useState } from "react";
import { Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const LikeButton = ({onLiked, isLiked}) => {
	const [liked, setLiked] = useState(isLiked);

	const likeMovie = () => {
		const toggleLike = !liked
		setLiked(toggleLike);
		onLiked(toggleLike);
	}

	return (
		<Pressable onPress={likeMovie}>
			<MaterialCommunityIcons
				name={liked ? "heart" : "heart-outline"}
				size={48}
				color={liked ? "red" : "black"}
			/>
		</Pressable>
	);
};

export default LikeButton;