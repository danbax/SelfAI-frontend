import { defineStore } from "pinia";
import type { Ref } from "vue";
import { computed, ref } from "vue";

import defaults from "@src/store/defaults";
import type {
  ISettings,
} from "@src/types";

const useStore = defineStore("chat", () => {
  const storage = JSON.parse(localStorage.getItem("chat") || "{}");

  // app status refs
  const status = ref("idle");

  const settings: Ref<ISettings> = ref(
    storage.settings || defaults.defaultSettings
  );
  
  // ui refs
  const activeSidebarComponent: Ref<string> = ref(
    storage.activeSidebarComponent || "messages"
  );
  const delayLoading = ref(true);
  const conversationOpen: Ref<string | undefined> = ref(
    storage.conversationOpen
  );
  const callMinimized = ref(false);
  const openVoiceCall = ref(false);

  const getStatus = computed(() => status);

  return {
    // status refs
    status,
    getStatus,

    // data refs
    settings,

    // ui refs
    activeSidebarComponent,
    delayLoading,
    conversationOpen,
    callMinimized,
    openVoiceCall,
  };
});

export default useStore;
