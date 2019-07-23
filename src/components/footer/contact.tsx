import * as React from "react";
import styled from "@emotion/styled";
import { Button } from "../button";
import { Label } from "../form/label";
import { Input } from "../form/input";
import { TextArea } from "../form/textarea";
import { ContentFade } from "../content-fade";
import { P } from "../typography/p";
import { IChildImageSharpFluid } from "../../interfaces";

const InputWrapper = styled.div({
  display: "inline-block",
  width: "49%",
});

const ContactForm = styled.form({
  marginBottom: 0,
  marginTop: 32,
});

interface IContactProps {
  image: IChildImageSharpFluid;
  title: string;
  description: string;
}

export const Contact: React.SFC<IContactProps> = ({
  image,
  title,
  description,
}) => {
  return (
    <ContentFade id="contact" imgSrc={image.childImageSharp.fluid.src}>
      <h3>{title}</h3>
      <P>{description}</P>
      <ContactForm
        name="contact"
        method="post"
        // action="/thanks?no-cache=1"
        data-netlify="true"
        data-netlify-honeypot="title-catch"
      >
        {/* This is for netlify */}
        <input type="hidden" name="form-name" value="contact" />
        {/* This is a honeypot field */}
        <InputWrapper css={{ display: "none" }}>
          <Label>
            Your title
            <Input type="text" name="title-catch" />
          </Label>
        </InputWrapper>
        <InputWrapper css={{ marginRight: "2%" }}>
          <Label>
            Name
            <Input type="text" name="name" required />
          </Label>
        </InputWrapper>
        <InputWrapper>
          <Label>
            Email
            <Input type="email" name="email" required />
          </Label>
        </InputWrapper>
        <Label css={{ marginTop: 16 }}>
          Message
          <TextArea name="message" rows={3} />
        </Label>
        <Button
          variant="primary"
          css={{
            marginTop: 32,
          }}
          type="submit"
        >
          Send Message
        </Button>
      </ContactForm>
    </ContentFade>
  );
};
