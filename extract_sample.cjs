
const fs = require('fs');

const inputFile = 'temp_data_repo/ui_demo.json';
const outputFile = 'src/api/realData_sample.json';

// Read the file (we'll read the whole thing assuming the machine has memory, 
// or stream it if we were being safer, but for 400MB node usually handles it ok-ish)
// ACTUALLY, to be safe and avoid crashing standard node limits, let's stream-parse 
// or just read a chunk. But the structure is complex JSON.
// Let's try reading it. If it fails, I'll write a stream parser.
try {
    const rawData = fs.readFileSync(inputFile, 'utf-8');
    const data = JSON.parse(rawData);

    // Navigate the structure: groups -> repos -> images -> vulnerabilities
    const extractedVulnerabilities = [];
    let count = 0;
    const limit = 1000;

    for (const groupKey in data.groups) {
        const group = data.groups[groupKey];
        if (group.repos) {
            for (const repoKey in group.repos) {
                const repo = group.repos[repoKey];
                if (repo.images) {
                    for (const imageKey in repo.images) {
                        const image = repo.images[imageKey];
                        if (image.vulnerabilities) {
                            for (const vuln of image.vulnerabilities) {
                                if (count >= limit) break;

                                // Map to our interface
                                extractedVulnerabilities.push({
                                    cveId: vuln.cve || `CVE-UNKNOWN-${count}`,
                                    packageName: vuln.package || imageKey.split(':')[0] || 'unknown',
                                    currentVersion: image.version || '0.0.0',
                                    fixedVersion: vuln.status.includes('fixed in') ? vuln.status.replace('fixed in ', '').split(',')[0] : null,
                                    severity: (vuln.severity || 'Low').charAt(0).toUpperCase() + (vuln.severity || 'low').slice(1).toLowerCase(),
                                    cvss: vuln.cvss || 0,
                                    publishedDate: image.createTime || new Date().toISOString(), // Fallback
                                    description: vuln.description || 'No description provided.',
                                    riskFactors: [], // Not in source, leave empty
                                    kaiStatus: 'valid' // Default
                                });
                                count++;
                            }
                        }
                        if (count >= limit) break;
                    }
                }
                if (count >= limit) break;
            }
        }
        if (count >= limit) break;
    }

    fs.writeFileSync(outputFile, JSON.stringify(extractedVulnerabilities, null, 2));
    console.log(`Successfully extracted ${extractedVulnerabilities.length} records to ${outputFile}`);

} catch (err) {
    console.error('Error processing file:', err);
}
