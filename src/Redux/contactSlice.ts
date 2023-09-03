import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Contact {
  id: any;
  firstname: string;
  lastname: string;
  status: string;
}

interface ContactState {
  contacts: Contact[];
}

export const initialState: ContactState = {
  contacts: [],
};

export const contactSlice = createSlice({
  name: "contactSlice",
  initialState: initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts = state.contacts.concat(action.payload);

      console.log(action.payload, "payload");
      console.log(state, "contacts");
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      const index = state.contacts.findIndex(
        (contact) => contact.id === action.payload.id
      );
      if (index !== -1) {
        state.contacts[index] = action.payload;
      }
    },
    deleteContact: (state, action: PayloadAction<any>) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
    },
  },
});

export const { addContact, updateContact, deleteContact } =
  contactSlice.actions;

export default contactSlice.reducer;
