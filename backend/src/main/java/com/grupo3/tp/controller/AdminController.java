package com.grupo3.tp.controller;

import com.grupo3.tp.dtos.PlatformStatsDTO;
import com.grupo3.tp.service.AdminStatsService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminStatsService adminStatsService;

    public AdminController(AdminStatsService adminStatsService) {
        this.adminStatsService = adminStatsService;
    }

    @GetMapping("/stats")
    public ResponseEntity<PlatformStatsDTO> getStats() {
        return ResponseEntity.ok(adminStatsService.getStats());
    }
}
