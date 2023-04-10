import Cmp from "./base-component";
import * as Validation from "../util/validation";
import { autobind as Autobind} from "../decorators/autobind";
import { projectState } from "../state/project-state";

  //Project input class
  export class ProjectInput extends Cmp<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    poeopleInputElement: HTMLInputElement;

    constructor() {
      super("project-input", "app", true, "user-input");
      this.titleInputElement = this.element.querySelector(
        "#title"
      )! as HTMLInputElement;
      this.descriptionInputElement = this.element.querySelector(
        "#description"
      )! as HTMLInputElement;
      this.poeopleInputElement = this.element.querySelector(
        "#people"
      )! as HTMLInputElement;

      this.configure();
    }

    configure() {
      this.element.addEventListener("submit", this.submitHandler.bind(this));
    }

    renderContent() {}

    private gatherUserInput(): [string, string, number] | void {
      const enteredTitle = this.titleInputElement.value;
      const enteredDescription = this.descriptionInputElement.value;
      const enteredPeople = this.poeopleInputElement.value;

      const titleValidatable: Validation.Validatable = {
        value: enteredTitle,
        required: true,
      };

      const descriptionValidatable: Validation.Validatable = {
        value: enteredDescription,
        required: true,
        minLength: 5,
      };

      const peopleValidatable: Validation.Validatable = {
        value: enteredPeople,
        required: true,
        min: 1,
        max: 5,
      };

      if (
        !Validation.validate(titleValidatable) ||
        !Validation.validate(descriptionValidatable) ||
        !Validation.validate(peopleValidatable)
      ) {
        alert("Invlid input. Please try again");
        return;
      } else {
        return [enteredTitle, enteredDescription, +enteredPeople];
      }
    }

    @Autobind
    private submitHandler(event: Event) {
      event.preventDefault();
      const userInput = this.gatherUserInput();
      if (Array.isArray(userInput)) {
        const [title, desc, people] = userInput;
        projectState.addProject(title, desc, people);
        console.log(title, desc, people);
        this.clearInputs();
      }
    }

    private clearInputs() {
      this.titleInputElement.value = "";
      this.descriptionInputElement.value = "";
      this.poeopleInputElement.value = "";
    }
  }

