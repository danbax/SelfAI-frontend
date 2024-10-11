<template>
  <KeepAlive>
    <div class="h-full flex flex-col overflow-hidden">
      <!-- Main content area -->
      <div class="flex-grow overflow-hidden xs:overflow-y-auto md:overflow-visible">
        <div class="h-full flex xs:flex-col md:flex-row">
          <!--sidebar-->

          <!-- User data content -->
          <div class="flex-grow overflow-hidden xs:overflow-y-auto md:overflow-visible">
            <SidebarHeader>
              <template v-slot:title>{{ userDataType }}</template>
            </SidebarHeader>

            <div class="px-5 xs:pb-6 md:pb-5">
              <SearchInput v-model="keyword" />
            </div>

            <div
              role="list"
              aria-label="conversations"
              class="w-full h-full scroll-smooth scrollbar-hidden"
              style="overflow-x: visible; overflow-y: auto"
            >
              <Circle2Lines
                v-if="loading && userData.length === 0"
                v-for="item in 6"
                :key="item"
              />

              <div v-else>
                <div v-if="userData.length > 0">
                  <FadeTransition>
                    <UserDataList :userData="userData" />
                  </FadeTransition>
                </div>

                <div v-else-if="!loading">
                  <NoConversation v-if="userData.length === 0" />
                </div>

                <div v-if="loading && userData.length > 0" class="flex justify-center py-4">
                  <Circle2Lines />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--navigation-bar-->
      <Navigation class="xs:mt-auto md:hidden" />
    </div>
  </KeepAlive>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useChatStore } from '@src/store/chats';
import { PencilSquareIcon } from "@heroicons/vue/24/outline";
import ComposeModal from "@src/components/shared/modals/ComposeModal/ComposeModal.vue";
import NoConversation from "@src/components/states/empty-states/NoConversation.vue";
import Circle2Lines from "@src/components/states/loading-states/Circle2Lines.vue";
import IconButton from "@src/components/ui/inputs/IconButton.vue";
import SearchInput from "@src/components/ui/inputs/SearchInput.vue";
import FadeTransition from "@src/components/ui/transitions/FadeTransition.vue";
import ArchivedButton from "./ArchivedButton.vue";
import UserDataList from "./UserDataList.vue";
import SidebarHeader from "@src/components/views/HomeView/Sidebar/SidebarHeader.vue";
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import { useUserDataStore } from '@src/store/userData';
import useStore from "@src/store/store";
import Navigation from "@src/components/views/HomeView/Navigation/Navigation.vue";
import Sidebar from "@src/components/views/HomeView/Sidebar/Sidebar.vue";
import { getActiveConversationId } from "@src/utils";

const route = useRoute();
const userDataStore = useUserDataStore();

const userDataType = ref(route.params.type as string);
const keyword = ref('');

const userData = computed(() => userDataStore.userData);
const loading = computed(() => userDataStore.loading);

onMounted(() => {
  userDataStore.fetchUserData(userDataType.value);
});

watch(() => route.params.type, (newType) => {
  userDataType.value = newType as string;
  userDataStore.fetchUserData(userDataType.value);
});

watch(keyword, () => {
  // You can add debounce here if needed
  userDataStore.fetchUserData(userDataType.value, keyword.value);
});
</script>