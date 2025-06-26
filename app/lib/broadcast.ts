import { supabase } from "./apiClient.ts";
import { useEffect, useState } from "react";
import { RealtimeChannel } from "@supabase/supabase-js";
import { updatePageQuery } from "./query.ts";

export const broadcast = () => {
  const [myChannel, setMyChannel] = useState<RealtimeChannel | null>(null);

  // Join a room/topic. Can be anything except for 'realtime'.
  useEffect(() => {
    if (!myChannel) return;
    // Subscribe to the Channel
    myChannel
      .on(
        "broadcast",
        { event: "shout" }, // Listen for "shout". Can be "*" to listen to all events
        (payload) => messageReceived(payload),
      )
      .subscribe();
  }, [myChannel]);

  // 'notion-project-id'
  const createMyChannel = (channelName: string) => {
    if (!checkChannelExist(channelName)) {
      const newChannel = supabase.channel(channelName, {
        config: {
          broadcast: { self: true, ack: true },
        },
      });

      setMyChannel(newChannel);
    }
  };

  const messageReceived = (payload) => {
    if (checkPageVersion(payload)) {
      updatePageQuery();
      rerendering();
    }
  };

  const sendMessageToMyChannel = () => {
    if (!myChannel) return;
    /**
     * Sending a message after subscribing will use Websockets
     */
    myChannel.subscribe((status) => {
      if (status !== "SUBSCRIBED") {
        return null;
      }

      myChannel.send({
        type: "broadcast",
        event: "shout",
        payload: { message: "Hi" },
      });
    });
  };

  const subscribeChannel = (dd: string) => {
    useEffect(() => {
      const changes = supabase
        .channel("schema-db-changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "content_in_block",
            filter: "block_id=eq.1",
          },
          (payload) => console.log(payload),
        )
        .subscribe();
    });
  };

  return {
    createMyChannel,
    messageReceived,
    sendMessageToMyChannel,
    subscribeChannel,
  };
};
