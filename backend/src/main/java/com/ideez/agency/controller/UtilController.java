package com.ideez.agency.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class UtilController {

    @GetMapping("/job-roles")
    public ResponseEntity<?> getJobRoles() {
        List<String> roles = new ArrayList<>();
        roles.add("Strategy Planner");
        roles.add("Client Manager");
        roles.add("Sales Person");
        roles.add("Social Media Manager");
        roles.add("Content Creator");
        roles.add("Graphic Designer");
        roles.add("Video Editor");
        roles.add("Copywriter");
        roles.add("Ads Manager");
        roles.add("SEO Beginner");
        roles.add("Data Analyst");
        roles.add("Customer Support");
        roles.add("Brand Manager");
        roles.add("Researcher");

        Map<String, Object> response = new HashMap<>();
        response.put("roles", roles);
        return ResponseEntity.ok(response);
    }
}
