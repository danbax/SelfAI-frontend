<script setup lang="ts">
import { computed, ref, reactive } from "vue";
import { useAuthStore } from '@src/store/auth';
import { useRouter } from 'vue-router';
import SlideTransition from "@src/components/ui/transitions/SlideTransition.vue";
import PasswordSection from "@src/components/views/AccessView/RegisterForm/PasswordSection.vue";
import PersonalSection from "@src/components/views/AccessView/RegisterForm/PersonalSection.vue";
import { RouterLink } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

// computed accessToken
const accessToken = computed(() => authStore.accessToken);
const isAuthenticated = computed(() => authStore.isAuthenticated);

// Use reactive instead of ref for formData
const formData = reactive({
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
});

// determines what form section to use.
const activeSectionName = ref("personal-section");

// determines what direction the slide animation should use.
const animation = ref("slide-left");

// get the active section component from the section name
const ActiveSection = computed(() => {
  if (activeSectionName.value === "personal-section") {
    return PersonalSection;
  } else if (activeSectionName.value === "password-section") {
    return PasswordSection;
  }
});

// (event) to move between modal pages
const changeActiveSection = (event: {
  sectionName: string;
  animationName: string;
}) => {
  animation.value = event.animationName;
  activeSectionName.value = event.sectionName;
};

const handleRegister = async () => {
  if (formData.password !== formData.confirmPassword) {
    console.error('Passwords do not match');
    return;
  }

  console.log('Attempting to register with:', formData);
  try {
    console.log('Calling authStore.register');
    await authStore.register(formData.email, formData.password, formData.firstName, formData.lastName);
    console.log('Registration successful, redirecting');
    //router.push('/');
  } catch (error) {
    console.error('Registration failed in component:', error);
  }
};
</script>

<template>
  <div class="p-5 md:basis-1/2 xs:basis-full flex flex-col justify-center items-center">
    <div class="w-full md:px-[26%] xs:px-[10%]">
      <!--header-->
      <div class="mb-6 flex flex-col">
        <img src="@src/assets/vectors/logo-gradient.svg" class="w-[1.375rem] h-[1.125rem] mb-5 opacity-70" />
        <p class="heading-2 text-color mb-4">Get started with SelfAI</p>
        <p class="body-3 text-color text-opacity-75 font-light">Sign up to start using messaging!</p>
      </div>
      Access {{ accessToken }}
      IS {{ isAuthenticated }}

      <!--form section-->
      <SlideTransition :animation="animation">
        <component
          @active-section-change="changeActiveSection"
          @register="handleRegister"
          :is="ActiveSection"
          :formData="formData"
        />
      </SlideTransition>

      <!--bottom text-->
      <div class="flex justify-center">
        <p class="body-2 text-color">
          Already have an account?
          <RouterLink to="/access/sign-in/" class="text-indigo-400 opacity-100">Sign in</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>
